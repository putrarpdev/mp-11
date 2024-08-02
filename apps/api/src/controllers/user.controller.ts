import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma';
import authAction from '@/actions/auth.action';
import { User } from '@/types/express/user';


export class UserController {
  public loginController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, password_hash } = req.body;

      const user = await authAction.login(username, password_hash);

      res.status(200).json({
        message: "Login Success",
        data: user,
      })
    } catch (err){
      next (err)
    }
  };

  public createUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { 
        username, 
        email, 
        firstname, 
        lastname, 
        password_hash, 
        referral_number, 
      } = req.body;

      function generateReferralCode(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ''
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
      };

      const user = await prisma.$transaction(async (client) => {
        const referralCode = generateReferralCode(8);

        const newUser = await client.users.create({
          data: {
            username,
            email,
            firstname,
            lastname,
            password_hash,
            referral_number: referralCode,
            points_balance: 0
          },
        });

        if (referral_number) {
          const referredByUser = await client.users.findUnique({
            where: {
              referral_number,
            },
          });
          
          if (referredByUser) {
            newUser.referred_by = Number(referredByUser.id)
            const points = 10000;
            const expiresAt = new Date();
            expiresAt.setMonth(expiresAt.getMonth() + 3);

            await client.referrals.create({
              data: {
                user_id: referredByUser.id,
                referred_user_id: referredByUser.id,
                points,
                expires_at: expiresAt,
              },
            });

            await client.users.update({
              where: {
                id: newUser.id,
              },
              data: {
                // points_balance: {
                //   increment: referredByUser.points_balance! + 10000
                // },
                referred_by: referredByUser.id,
              },
            });

            await client.users.update({
              where: {
                id: referredByUser.id,
              },
              data: {
                points_balance: {
                  increment: 10000
                },
                
              },
            });

            await client.discount_coupons.create({
              data: {
                user_id: newUser.id,
                discount_percentage: 10,
                expires_at: expiresAt,
              }
            })
          }
        }

        // await client.user_roles.create({
        //   data: {
        //     user_id: newUser.id,
        //     role_id: 2,
        //   }
        // })
        return newUser;
        });

      res.status(200).json({
        message: "Create user success",
        data: user,
      });
    } catch (err) {
      next (err)
    };
  };

  

  public getUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, email, firstname, lastname } = req.query;
      let filter = {};

      if (username) filter = { ...filter, username };
      if (email) filter = { ...filter, email };
      if (firstname) filter = { ...filter, firstname };
      if (lastname) filter = { ...filter, lastname };

      const user = await prisma.users.findMany({
        where: {
          ...filter,
        }
      });

      res.status(200).json({
        message: "Get user success",
        data: user,
      });
    } catch (err) {
      next (err)
    }
  };

  public getUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.user as User;

      const user = await authAction.findUserByEmail(String(email));

      if (!user) throw new Error("User not found!");

      res.status(200).json({
        message: "Get user success",
        data: user,
      })
    } catch (err) {
      next (err);
    }
  }

  public updateUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;  
      const { firstname, lastname } = req.body;

      // const check = await authAction.findUserById(Number(userId));

      // if (!check) throw new Error("User not found!");

      let params = {};

      if (firstname) params = { ...params, firstname };
      if (lastname) params = { ...params, lastname };

      const user = await prisma.users.update({
        where: {
          id: Number(userId),
        },
        data: {
          ...params,
        },
      });

      res.status(200).json({
        message: "Update user success",
        data: user,
      });
    } catch (err) {
      next (err)
    }
  };

  public deleteUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;
      // const numericUserId = Number(userId)
      const user = await prisma.users.delete({
        where: {
          id: Number(userId),
        },
      });

      res.status(200).json({
        message: "Delete user success",
        data: user,
      })
    } catch (err) {
      next (err);
    }
  }
}

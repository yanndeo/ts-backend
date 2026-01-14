import { Permission } from '../permissions/index';
import { ROLE_PERMISSIONS } from '../roles';


type AuthUser = {
    userId: number;
    role: "USER" | "ADMIN";
};


export class UserPolicy {

    /* static canDeleteUser(authUser: { userId: number; isAdmin: boolean }, targetUserId: number): boolean {
        if (authUser.isAdmin) {
            return true;
        }

        return authUser.userId === targetUserId;
    } */

    static can(
        user: AuthUser,
        permission: Permission,
        targetUserId: number
    ): boolean {

        const permissions = ROLE_PERMISSIONS[user.role];

        if (!permissions.includes(permission)) {
            return false;
        }

        if (permission === Permission.DELETE_USER) {
            return user.userId === targetUserId;
        }

        return true;
    }

}
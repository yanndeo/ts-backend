

export class UserPolicy {

    static canDeleteUser(authUser: { userId: number; isAdmin: boolean }, targetUserId: number): boolean {
        if (authUser.isAdmin) {
            return true;
        }

        return authUser.userId === targetUserId;
    }
}
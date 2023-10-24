import { ROLE } from "@prisma/client";
import type { User } from "next-auth";
import type { Session } from "next-auth/client";
import 'next-auth/jwt';

type UserId = string;


declare module 'next-auth/jwt' {
    interface JWT {
        id: UserId;
        role: ROLE;
    }
}

declare module 'next-auth' {
    interface Session {
        user: User & {
            id: UserId;
            role: ROLE;
        };
    }
}




import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb";
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.upsert({
            where: { email: email },
            update: {
                name: name,
                hashedPassword: hashedPassword,
            },
            create: {
                name: name,
                email: email,
                hashedPassword: hashedPassword,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

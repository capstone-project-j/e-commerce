'use client'

import { Avatar } from "@mui/material";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import MenuItem from "./MenuItem"
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { User } from "@prisma/client";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
    currentUser: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

    const [isOPen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, [])

    return (
        <>
            <div className="relative z-30">
                <div onClick={toggleOpen} className="
                p-2
                border-[1px]
                border-slate-400
                flex
                flex-row
                items-center
                gap-1
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
                text-slate-700
                "
                >
                    <Avatar />
                    <AiFillCaretDown />
                </div>
                {isOPen && (
                    <div className="absolute
                    rounded-md
                    shadow-md
                    w-[170px]
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                    flex
                    flex-col
                    cursor-pointer
                    ">
                        {currentUser ? <div>
                            <Link href="/orders" >
                                <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                            </Link>
                            <Link href="/admin" >
                                <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                            </Link>
                            <hr />
                            <MenuItem onClick={() => {
                                toggleOpen();
                                signOut()
                            }}> Logout</MenuItem>
                        </div> : <div>
                            <Link href="/login" >
                                <MenuItem onClick={toggleOpen}>Login</MenuItem>
                            </Link>
                            <Link href="/register" >
                                <MenuItem onClick={toggleOpen}>Register</MenuItem>
                            </Link>
                        </div>}
                    </div>
                )}
            </div>
            {isOPen ? <BackDrop onClick={toggleOpen} /> : null}
        </>
    );
}

export default UserMenu;
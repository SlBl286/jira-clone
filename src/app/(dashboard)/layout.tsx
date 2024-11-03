import React from "react"

type DashboardLayoutProps = {
    children : React.ReactNode;
}

export default function DashboardLayout({children} : DashboardLayoutProps){
    return (
        <div className="min-h-screen ">
            <div className="flex w-full h-full">
                <div className="lg:pl-[264px]">

                </div>
            {children}
            </div>
        </div>
    )
}
"use client";

import { UserProfile } from "@clerk/nextjs";
import React from "react";

function Profile() {
    return (
        // <div className="border rounded-[0.75rem] border-gray-600">
        <UserProfile
            path="/settings"
            routing="path"
            appearance={{
                elements: {
                    rootBox: "w-full",
                    cardBox: "w-full border border-gray-600",
                    card: "w-full",
                    navbar: "hidden",
                    profileSection__username: "hidden",
                    profileSection__danger:
                        "border-t border-gray-200 mt-6 pt-6",
                },
            }}
        />
        // </div>
    );
}

export default Profile;

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";

const PasswordField = ({ field, placeholder }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <Input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                {...field}
            />
            <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
            >
                {show ? <EyeOff /> : <Eye />}
            </button>
        </div>
    );
};

export default PasswordField;
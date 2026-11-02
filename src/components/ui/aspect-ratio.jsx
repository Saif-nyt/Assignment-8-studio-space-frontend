import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "cn";
function AspectRatio({ ratio, className, ...props }) {
    return (_jsx("div", { "data-slot": "aspect-ratio", style: {
            "--ratio": ratio
        }, className: cn("relative aspect-(--ratio)", className), ...props }));
}
export { AspectRatio };

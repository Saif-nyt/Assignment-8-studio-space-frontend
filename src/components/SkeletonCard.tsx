import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "@/components/ui/skeleton";
function SkeletonCard() {
    return (_jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: [_jsx(Skeleton, { className: "aspect-[4/3] w-full rounded-none" }), _jsxs("div", { className: "space-y-3 p-5", children: [_jsx(Skeleton, { className: "h-5 w-3/4" }), _jsx(Skeleton, { className: "h-3 w-1/2" }), _jsxs("div", { className: "flex items-center justify-between border-t border-border pt-4", children: [_jsx(Skeleton, { className: "h-4 w-16" }), _jsx(Skeleton, { className: "h-4 w-20" })] })] })] }));
}
export default SkeletonCard;

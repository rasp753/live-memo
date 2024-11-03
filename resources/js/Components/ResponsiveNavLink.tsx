import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-accent-foreground bg-accent text-primary focus:border-accent-foreground focus:bg-accent focus:text-primary'
                    : 'border-transparent text-muted-foreground hover:border-accent-foreground/70 hover:bg-accent/70 hover:text-primary/70 focus:border-accent-foreground/70 focus:bg-accent/70 focus:text-primary/70'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}

import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-primary text-primary focus:border-border'
                    : 'border-transparent text-muted-foreground hover:border-accent-foreground/70 hover:text-primary/70 focus:border-accent-foreground/70 focus:text-primary/70') +
                className
            }
        >
            {children}
        </Link>
    );
}

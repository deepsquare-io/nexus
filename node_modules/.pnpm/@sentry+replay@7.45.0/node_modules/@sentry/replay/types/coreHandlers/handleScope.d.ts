import type { Breadcrumb, Scope } from '@sentry/types';
import type { ReplayContainer } from '../types';
export declare const handleScopeListener: (replay: ReplayContainer) => (scope: Scope) => void;
/**
 * An event handler to handle scope changes.
 */
export declare function handleScope(scope: Scope): Breadcrumb | null;
//# sourceMappingURL=handleScope.d.ts.map
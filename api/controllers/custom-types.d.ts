// custom-types.d.ts
import 'express';

declare module 'express-serve-static-core' {
    interface Response {
        view(viewPath: string, locals?: any): any;
        // Add other Sails-specific methods as needed
    }
}

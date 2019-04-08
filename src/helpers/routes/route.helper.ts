export class RouteHelper {

    private paths: PathInterface[];
    private routeString: string = '';

    constructor(paths: PathInterface[]) {
        this.paths = paths;
        this.routeString = '';
        this.populateData();
    }

    private populateData() {
        this.routeString += `import express from 'express';\n`;
        this.paths.forEach((path) => {
            this.routeString += `${this.getControllerImportString(path.pathName)}\n`;
        });
        this.routeString += `\n`;
        this.routeString += `export class MainRoute {\n\n`;

        this.routeString += `   public static register(app: express.Application) {\n\n`;

        this.paths.forEach((path) => {
            path.pathMethods.forEach((method) => {
                this.routeString += `       ${this.getRouteString(path.route, path.pathName, method.toString(), path.pathParameter)}\n`;
            });
            this.routeString += `\n`;
        });

        this.routeString += `   }\n`;

        this.routeString += `}\n`;
    }

    public getRoutesClass() {
        return this.routeString;
    }

    private getControllerImportString(path: string): string {
        let importString = `import { ${path.substring(0, 1).toUpperCase() + path.substring(1).toLowerCase()}Controller }`;
        importString += ` from '../controllers/${path.toLowerCase()}.controller';`;
        return importString;
    }

    private getRouteString(route: string, path: string, method: string, parameter?: string): string {
        let routeString = '';
        routeString += `app.route('`;
        routeString += route;
        if (parameter) { routeString += `/:_${parameter.toLowerCase()}`; }
        routeString += `').${method.toLowerCase()}(${path.substring(0, 1).toUpperCase() + path.substring(1).toLowerCase()}Controller.`;
        routeString += `${method.toLowerCase()}${path.substring(0, 1).toUpperCase() + path.substring(1).toLowerCase()}`;
        if (parameter) { routeString += `For${parameter.substring(0, 1).toUpperCase() + parameter.substring(1).toLowerCase()}`; }
        routeString += '());';
        return routeString;
    }
}

export interface PathInterface {
    route: string;
    pathName: string;
    pathMethods: HttpMethods[];
    pathParameter?: string;
}

export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT",
    PATCH = "PATCH"
}
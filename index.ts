import { RouteHelper, PathInterface, HttpMethods } from './src/helpers/routes/route.helper';

const paths: PathInterface[] = [
    {
        pathName: 'users',
        route: '/users',
        pathMethods: [
            HttpMethods.GET,
            HttpMethods.POST,
            HttpMethods.PUT,
            HttpMethods.DELETE
        ]
    },
    {
        pathName: 'contacts',
        route: '/contacts',
        pathMethods: [
            HttpMethods.GET,
            HttpMethods.POST,
            HttpMethods.PUT,
            HttpMethods.DELETE
        ]
    },
];

const classString = new RouteHelper(paths).getRoutesClass();
console.log(classString);
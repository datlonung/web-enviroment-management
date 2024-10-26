import Home from "../pages/Home/Home";
import config from "../config";
import Map from "../pages/Map/Map";
import ManagerTrash from "../pages/ManagerTrash/ManagerTrash";
import AddTrashcan from "../components/addTrashCan/AddTrashcan";
import EditTrashcan from "../components/editTrashcan/EditTrashcan";
import DetailTrash from "../components/detailTrash/DetailTrash";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import Login from "../components/auth/Login";


//Puclic Routes
const publicRoutes = [
    {
        path: config.routes.login,
        layout: false,
        component: Login,
    },
    {
        path: config.routes.pageNotFound,
        component: PageNotFound,
        layout: false
    }
];


const privateRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.map,
        component: Map,
    },
    {
        path: config.routes.managerTrash,
        component: ManagerTrash,
    },
    {
        path: config.routes.addTrash,
        component: AddTrashcan,
    },
    {
        path: config.routes.editTrash,
        component: EditTrashcan,
    },
    {
        path: config.routes.detailTrash,
        component: DetailTrash,
    },
];

export { publicRoutes, privateRoutes };
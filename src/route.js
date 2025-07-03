import React from "react";
import {
    Switch,
    Route,
    useLocation,
    Redirect
} from "react-router-dom";

import Login from './login';
import Header from './components/header';
import ProductPage from './components/product';
import ProductDetailsPage from './components/product-details';
import CartPage from './components/cart';
import PaymentPage from './components/payment';
import PaymentSuccess from './components/payment-success';
import AboutComponent from './components/about/about';
import ListComponent from './components/list';
import TestComponent from './components/test';

function Routes() {
    let location = useLocation();
    let locStr = location.pathname.split(',');
    // console.log('location.pathname', locStr[0] == '/')

    const routes = [{
        path: '/',
        exact: true,
        component: Login        
    }, {
        path: '/about',
        component: AboutComponent
    }, {
        path: '/product-list',
        component: ProductPage
    }, {
        path: '/product-details/:pId',
        component: ProductDetailsPage
    }, {
        path: '/payment',
        component: PaymentPage
    }, {
        path: '/payment-success',
        component: PaymentSuccess
    }, {
        path: '/cart',
        component: CartPage
    }];
    
    const privateRoutes = [{
        path: '/list',
        component: ListComponent
    }, {
        path: '/test',
        component: TestComponent
    }];
    return (
        <>
            {
                !!locStr && locStr[0] === '/' ?
                null : <Header>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                    </Header>
            }
            
            <Switch>
                {
                    routes.map(route => {
                        return (
                           <Route path={route.path} {...route}/> 
                        )
                    })
                }
                {
                    privateRoutes.map(route => {
                        return (
                           <PrivateRoute path={route.path} {...route}/> 
                        )
                    })
                }
            </Switch>
        </>
    );
}

function PrivateRoute({component, ...rest}) {
    let obj = {component: component, ...rest};
    if(true) {
        return (
            <Route key={obj.path} component={() => <obj.component path={obj.path}/>}/>
        )
    } else {
        <Redirect to={{
            pathname: "/"
        }}/>
    }
}

export default Routes;

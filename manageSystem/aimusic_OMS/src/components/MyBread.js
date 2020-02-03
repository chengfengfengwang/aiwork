import { Breadcrumb, Divider } from 'antd';
import routes from './../../config/config'
const MenuRoutes = routes.routes[0].routes;
export default class MyBread extends React.Component {
    render(){
        const path = location.hash.split('?')[0].slice(1);
        let subMemu,menuItem;
        MenuRoutes.forEach(e=>{
            if(e.routes){
                e.routes.forEach(i=>{
                    if(path==i.path){
                        menuItem = i.name;
                        if(e.name){console.log(e.name);subMemu = e.name}
                    }
                })
            }
        })
        return(
            <div id="myBread">
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><a href="/#/dashboard">主页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>{subMemu}</Breadcrumb.Item>
                    <Breadcrumb.Item>{menuItem}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}
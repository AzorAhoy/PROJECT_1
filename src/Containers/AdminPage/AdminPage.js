import React, { Component } from 'react';
import { Admin, ListGuesser, Resource, EditGuesser } from 'react-admin';
//import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import jsonServerProvider from 'ra-data-json-server';

import { PostList, PostEdit, PostCreate} from './post';
import { UserList } from './user';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from '../../Components/Dashboard/Dashboard';

class AdminPage extends Component {
    render() {
        const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
        //const restClient = jsonServerRestClient('http://jsonplaceholder.typicode.com');
        return (
            <div>
                <Admin dashboard={Dashboard} dataProvider={dataProvider} edit={PostEdit} create={PostCreate}>
                    <Resource name="posts" list={PostList} edit={EditGuesser} create={PostCreate} icon={PostIcon}/>
                    <Resource name="users" list={UserList} icon={UserIcon}/>
                </Admin>
            </div>
        );
    }
}

export default AdminPage;
// in posts.js
import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, 
        TextField, EditButton, DisabledInput, TextInput, 
        LongTextInput, DateInput, ReferenceField, ReferenceInput,
        SelectInput, Filter
} from 'react-admin';
//import BookIcon from '@material-ui/core/svg-icons/action/book';
//export const PostIcon = BookIcon;

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const PostList = (props) => (
    <List filters={<PostFilter/>} {...props}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            {/* <TextField source="id" /> */}
            <TextField source="title" />
            {/* <TextField source="body" /> */}
            <EditButton/>

        </Datagrid>
    </List>
);

// const PostTitle = ({ record }) => {
//     return <span>Post {record ? `"${record.title}"` : ''}</span>;
// };

// export const PostEdit = (props) => (
//     <Edit title={<PostTitle />} {...props}>
//         <SimpleForm>
//             <DisabledInput source="id" />
//             <TextInput source="title" />
//             <TextInput source="teaser" options={{ multiLine: true }} />
//             <LongTextInput source="body" />
//             <DateInput label="Publication date" source="published_at" />
//             <TextInput source="average_note" />
//             <DisabledInput label="Nb views" source="views" />
//         </SimpleForm>
//     </Edit>
// );



export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <ReferenceInput source="userId" reference="users">
                {/* <SelectInput optionText="id" /> */}
                <SelectInput optionText="name" />
            </ReferenceInput>
            {/* <TextInput source="id" /> */}
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Edit>
);


const graph = require('graphql');

const userData = [
    { id: '1', name: 'John', age: 25 },
    { id: '2', name: 'Sara', age: 22 },
    { id: '3', name: 'Bill', age: 24 }
];

const hobbyData = [
    { id: '1', title: 'Sports', description: 'Playing sports', userId: '1' },
    { id: '2', title: 'Music', description: 'Playing music', userId: '2' },
    { id: '3', title: 'Cooking', description: 'Cooking food', userId: '3' },
    { id: '4', title: 'Sports', description: 'Playing sports', userId: '1' },

];

const postData = [
    { id: '1', comment: 'This is a comment', userId: '1' },
    { id: '2', comment: 'This is a comment', userId: '2' },
    { id: '3', comment: 'This is a comment', userId: '3' },

];

const {
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLID
} = graph;
const UserType = new GraphQLObjectType({
    name: 'User',
    descritopn: 'User object',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },

    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post object',
    fields: () => ({
        id: {type: GraphQLID},
        comment: { type:GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return userData.find(user => user.id === parent.userId);
            }
        }
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby object',
    fields: () => ({
        id: {type: GraphQLID},
        title: { type:GraphQLString },
        description: {type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return userData.find(user => user.id === parent.userId);
            }
        }
    })
});

//RootQuery is the entry point to the graph
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //code to get data from db/other source
               return userData.find(user => user.id === args.id);
            }
        },
        hobby: {
            type: HobbyType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //code to get data from db/other source
                return hobbyData.find(hobby => hobby.id === args.id);
            }
        },
        post: {
            type: PostType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //code to get data from db/other source
                return postData.find(post => post.id === args.id);
            }
        }

    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});
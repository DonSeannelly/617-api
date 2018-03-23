import { GraphQLObjectType, GraphQLString } from 'graphql'

export const MaterialsType = new GraphQLObjectType({
  name: 'Materials',
  fields: () => ({
    youtubeVideo: { type: GraphQLString },
  })
})
import { GraphQLObjectType, GraphQLString } from 'graphql'

export const MATERIALS_TYPE = new GraphQLObjectType({
  name: 'Materials',
  fields: () => ({
    youtubeVideo: { type: GraphQLString },
  })
})
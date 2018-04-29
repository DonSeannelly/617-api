import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { MaterialsType } from './materials.type'
import { UserType } from '../user.schema'
import { SectionType } from './section.type';

const MealType = new GraphQLObjectType({
  name: 'Meal',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    byteIds: { type: GraphQLList(GraphQLString) }
  })
})

const InvitationType = new GraphQLObjectType({
  name: 'Invitation',
  fields: () => ({
    // User props
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    // Additional Props
    dateSent: { type: GraphQLString }
  })
})

const MealCompletionType = new GraphQLObjectType({
  name: 'MealCompletion',
  fields: () => ({
    mealId: { type: GraphQLString },
    dateCompleted: { type: GraphQLString }
  })
})

const MemberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    // User props
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    // Additional props
    mealsCompleted: { type: GraphQLList(MealCompletionType) }
  })
})

export const TableType = new GraphQLObjectType({
  name: 'Table',
  fields: () => ({
    id: { type: GraphQLString },
    owner: { type: UserType },
    meals: { type: GraphQLList(MealType) },
    invitations: { type: GraphQLList(InvitationType) },
    members: { type: GraphQLList(MemberType) }
  })
})

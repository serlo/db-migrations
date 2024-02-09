import { createEdtrIoMigration, replacePluginState } from './utils'

interface GroupedExercise {
  id: number
  group_id: number
}


export const changeStateOfGroupedExerciseInjections = replacePluginState({
  injections: ({state}) => {

    const groupedExercises = getAllGroupedExercises()
    const id = state.startsWith('/') ? state.substring(1) : state
    if (id in groupedExercises.map(ex => ex.id)){
      return `${groupedExercises.find(ex => ex.id == state).group_id}#${id}`
    }
  }
})

export function getAllGroupedExercises(): GroupedExercise[] {
  // TODO
}

createEdtrIoMigration({
  exports: module.exports,
  migrateState: changeStateOfGroupedExerciseInjections,
})

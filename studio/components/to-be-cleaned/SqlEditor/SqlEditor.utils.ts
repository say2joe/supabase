import toast from 'react-hot-toast'
import { UserContent } from 'types'
import { useProjectContentStore } from 'stores/projectContentStore'
import { NEW_SQL_SNIPPET_SKELETON } from './SqlEditor.constants'

/*
 * createSqlSnippet()
 *
 * Creates a new SQL snippet with a basic skeleton
 *
 */
export const createSqlSnippet = async ({
  router,
  sql,
  name,
}: {
  router: any
  sql: any
  name: any
}) => {
  const { ref } = router.query
  try {
    const contentStore = useProjectContentStore(ref)
    const skeleton: UserContent = {
      ...NEW_SQL_SNIPPET_SKELETON,
      ...(name && { name }),
      content: {
        ...NEW_SQL_SNIPPET_SKELETON.content,
        content_id: '',
        sql: sql,
      },
    }

    const { data: sqlSnippet, error } = await contentStore.create(skeleton)
    if (error) throw error

    // reload store data
    await contentStore.load()
    return sqlSnippet[0]
  } catch (error: any) {
    console.error(error)
    toast.error(error.message)
  }
}

/*
 * deleteSqlSnippet()
 *
 * Deletes a SQL snippet
 *
 */
export const deleteSqlSnippet = async ({ router, id }: { router: any; id: any }) => {
  const { ref } = router.query
  try {
    const contentStore = useProjectContentStore(ref)

    const { data: delReport, error } = await contentStore.del(id)
    if (error) throw error

    // reload store data
    await contentStore.load()

    return delReport
  } catch (error: any) {
    console.error(error)
    toast.error(error.message)
  }
}

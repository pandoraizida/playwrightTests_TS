declare module 'types' {

    export type userCredsType = {
        username: string,
        password: string
    }

    export type arrayOfString = string[]

    export type taskCountType = number

    export type taskDataType = {
        assignee: string,
        title: string,
        content: string,
        status: string,
        label: string
      }
      
      export type itemCountType = {
          user?: number,
          label?: number,
          status?: number,
          task?: number
      }
      
      export type taskStatusType = {
        draft: string,
        toReview: string,
        toBeFixed: string,
        toPublish: string,
        published: string
      }
      
      export type taskCountWithStatusType = {
        draft: number,
        toReview: number,
        toBeFixed: number,
        toPublish: number,
        published: number
      }
}
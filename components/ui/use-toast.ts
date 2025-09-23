// "use client";

// import * as React from "react"

// import type { ToastProps } from "./toast"

// const TOAST_LIMIT = 1

// type Toasts = ToastProps & { id: string }

// type State = { 
//   toasts: Toasts[]
// }

// type Action = 
//   | { type: "ADD_TOAST"; toast: Toasts }
//   | { type: "UPDATE_TOAST"; toast: Toasts }
//   | { type: "DISMISS_TOAST"; toastId?: string }
//   | { type: "REMOVE_TOAST"; toastId?: string }

// interface Toast extends Toasts {
//   id: string
//   dismiss: () => void
// }

// type Dispatch = (action: Action) => void

// const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// const addToRemoveQueue = (toastId: string) => {
//   if (toastTimeouts.has(toastId)) {
//     return
//   }

//   const timeout = setTimeout(() => {
//     toastTimeouts.delete(toastId)
//     dispatch({ type: "REMOVE_TOAST", toastId: toastId })
//   }, 1000)

//   toastTimeouts.set(toastId, timeout)
// }

// export const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "ADD_TOAST":
//       return {
//         ...state,
//         toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
//       }

//     case "UPDATE_TOAST":
//       return {
//         ...state,
//         toasts: state.toasts.map((t) =>
//           t.id === action.toast.id ? { ...t, ...action.toast } : t
//         ),
//       }

//     case "DISMISS_TOAST":
//       {
//         const { toastId } = action

//         // ! Side effects ! Clear any timeouts for the toast if they exist
//         if (toastId) {
//           toastTimeouts.delete(toastId)
//         }

//         return {
//           ...state,
//           toasts: state.toasts.map((t) =>
//             t.id === toastId ? { ...t, open: false } : t
//           ),
//         }
//       }
//     case "REMOVE_TOAST":
//       return {
//         ...state,
//         toasts: state.toasts.filter((t) => t.id !== action.toastId),
//       }
//     default:
//       return state
//   }
// }

// const listeners: ((state: State) => void)[] = []

// let state: State = {
//   toasts: [],
// }

// function setState(action: Action) {
//   state = reducer(state, action)
//   listeners.forEach((listener) => listener(state))
// }

// function dispatch(action: Action) {
//   setState(action)
// }

// function useToast() {
//   const [snapshot, setSnapshot] = React.useState(state)

//   React.useEffect(() => {
//     return () => {
//       listeners.forEach((timeout) => clearTimeout(timeout))
//     }
//   },[])
  
//   React.useEffect(() => {
//     listeners.push(setSnapshot)
//     return () => {
//       let index = listeners.indexOf(setSnapshot)
//       if (index > -1) {
//         listeners.splice(index, 1)
//       }
//     }
//   }, [snapshot])

//   return {
//     toasts: snapshot.toasts,
//     toast,
//   }
// }

// let count = 0

// function genId() {
//   count = (count + 1) % Number.MAX_VALUE
//   return count.toString()
// }

// function toast({ ...props }: ToastProps) {
//   const id = genId()
//   const update = (props: Toasts) =>
//     dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } })
//   const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

//   dispatch({ type: "ADD_TOAST", toast: { ...props, id, dismiss, update } })

//   if (props.duration) {
//     addToRemoveQueue(id)
//   }

//   return { id: id, dismiss, update }
// }

// export { useToast, toast }

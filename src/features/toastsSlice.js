import { createSlice } from '@reduxjs/toolkit'



// -- STATE --

const initialState = []

export const selectToasts = state => state.toasts



// -- ACTIONS --

export const infoToastAdded = (title, message, autohide = false) => {
  return toastAdded({
    title:    title,
    body:     message,
    icon:     'exclamation-circle',
    style:    'info',
    autohide
  })
}

export const successToastAdded = (title, message, autohide = false) => {
  return toastAdded({
    title:    title,
    body:     message,
    icon:     'check-circle',
    style:    'success',
    autohide
  })
}

export const errorToastAdded = (title, message, autohide = false) => {
  return toastAdded({
    title:    title,
    body:     message,
    icon:     'exclamation-triangle',
    style:    'danger',
    autohide
  })
}



// -- REDUCER --

export const toastsSlice = createSlice({
  name: 'toasts',
  initialState,

  reducers: {
    toastAdded: (state, action) => {
      const { title, body, icon, style, autohide } = action.payload

      if (! state.find(toast => toast.title === title)) {
        state.push({ title, body, icon, style, autohide })
      }
    },

    toastDestroyed: (state, action) => {
      const title = action.payload
      const index = state.findIndex(toast => toast.title === title)

      if (index !== -1) {
        state.splice(index, 1)
      }
    }
  }
})

export const {
  toastAdded,
  toastDestroyed
} = toastsSlice.actions

export default toastsSlice.reducer

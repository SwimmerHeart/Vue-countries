import { SnackbarProgrammatic as Snackbar } from 'buefy'

export function snackbarInfo(text) {
    Snackbar.open({
        type: "is-primary",
        message: text,
        position: "is-top-right",
        duration: 3000
    } )
}
export function snackbarError(text) {
    Snackbar.open({
        type: "is-danger",
        message: text,
        position: "is-top-right",
        queue: false,
        indefinite: true
    })

}
export function snackbarWarning() {
    Snackbar.open('Look at me!')

}


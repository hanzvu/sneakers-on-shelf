import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import modalReducer from './modalSlice'
import snackbarReducer from './snackbarSlice'
import ghnProvinceReducer from './ghnProvinceSlice'
import ghnDistrictReducer from './ghnDistrictSlice'
import ghnWardReducer from './ghnWardSlice'

export default configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer,
        snackbar: snackbarReducer,
        ghnProvince: ghnProvinceReducer,
        ghnDistrict: ghnDistrictReducer,
        ghnWard: ghnWardReducer
    }
})
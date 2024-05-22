import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ROUTES } from 'src/shared/consts'
import { Spinner } from 'src/shared/ui/Spinner'
import { Layout } from 'src/app/Layout'
import { Page404 } from 'src/pages/Page404'
import { AboutMovie, RatedMovies } from 'src/pages'
import { AllMovies } from 'src/pages/AllMovies'
import { ScrollToTop } from 'src/shared/ui'

const PublicRoutes = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <ScrollToTop />
            <Routes>
                <Route path={ROUTES.MAIN} element={<Layout />}>
                    <Route path={ROUTES.MAIN} element={<AllMovies />} />
                    <Route path={ROUTES.MOVIE} element={<AboutMovie />} />
                    <Route path={ROUTES.RATED} element={<RatedMovies />} />
                    <Route path={ROUTES.NOTFOUND} element={<Page404 />} />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to={ROUTES.NOTFOUND} replace />}
                />
            </Routes>
        </Suspense>
    )
}

export default PublicRoutes

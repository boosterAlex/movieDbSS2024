import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from 'src/shared/consts'
import { Spinner } from 'src/shared/ui/Spinner'
import { Layout } from 'src/app/Layout'
import { Page404 } from 'src/pages/Page404'
import { AboutMovie, RatedMovies } from 'src/pages'
import { AllMovies } from 'src/pages/AllMovies'
import { ScrollToTop } from 'src/components/ScrollToTop'

const PublicRoutes = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <ScrollToTop />
            <Routes>
                <Route path={ROUTES.MAIN} element={<Layout />}>
                    <Route path={ROUTES.MAIN} element={<AllMovies />} />
                    <Route path={ROUTES.MOVIE} element={<AboutMovie />} />
                    <Route path={ROUTES.RATED} element={<RatedMovies />} />
                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Suspense>
    )
}

export default PublicRoutes

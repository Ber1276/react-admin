import { Spin } from "antd"
import React, { Suspense } from "react"

export const lazyLoad = (Component:any) :React.ReactNode=> {
    return <Suspense fallback={<Spin></Spin>}>
        <Component/>
    </Suspense>
}
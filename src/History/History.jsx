import React from "react"
import { Route, Routes } from "react-router-dom"
import DetailHistory from "./Component/DetailHistory"
import MainHistory from "./Component/MainHistory"

function History(props) {
  return (
    <Routes>
      <Route exact path="/history" element={<MainHistory />} />

      <Route path="/history/:id" element={<DetailHistory />} />
    </Routes>
  )
}

export default History

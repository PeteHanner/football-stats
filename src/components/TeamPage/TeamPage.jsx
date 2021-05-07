import React from "react"
import { useParams } from "react-router-dom"

const TeamPage = () => {
  const { name } = useParams()
  return(
    `Team Page for ${name}!`
  )
}

export default TeamPage

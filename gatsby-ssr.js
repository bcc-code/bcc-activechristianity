/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"
import Layout from "./src/layouts/App.tsx"

import "react-placeholder/lib/reactPlaceholder.css"
import "normalize.css/normalize.css"
import "./src/styles/reset.css"
import "./src/styles/tailwind-output.css"

import wrapWithProvider from "./provider"

export const wrapRootElement = wrapWithProvider

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>
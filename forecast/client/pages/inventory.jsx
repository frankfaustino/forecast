import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Heading, Table, TableBody, TableCell, TableHeader, TableRow, Text } from 'grommet'

const QUERY = gql`
  query {
    inventory {
      elements {
        id
        name
        sku
        modifiedTime
        price
        cost
      }
      href
    }
  }
`

const Inventory = () => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading'
      if (error) return `Error! ${error.message}`

      return (
        <>
        <Heading>Inventory</Heading>
        <Table caption='Simple Table'>
          <TableHeader>
            <TableRow>
              <TableCell scope='col' border='bottom'>
                <Text>Name</Text>
              </TableCell>
              <TableCell scope='col' border='bottom'>
                <Text>Cost</Text>
              </TableCell>
              <TableCell scope='col' border='bottom'>
                <Text>Price</Text>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.inventory.elements.map(({ cost, id, name, price, sku }, i) => (
              <TableRow key={id + i}>
                <TableCell scope="row">
                  <Text>
                    {name}
                  </Text>
                </TableCell>
                <TableCell scope="row">
                  <Text>
                    ${cost}
                  </Text>
                </TableCell>
                <TableCell scope="row">
                  <Text>
                    ${price}
                  </Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </>
      )
    }}
  </Query>
)

export default Inventory

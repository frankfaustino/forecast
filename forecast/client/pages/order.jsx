import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Heading, Table, TableBody, TableCell, TableHeader, TableRow, Text } from 'grommet'

const QUERY = gql`
  query {
    order {
      elements {
        id
        currency
        employee {
          id
        }
        state
        total
        lineItems {
          elements {
            orderRef {
              id
            }
            item {
              id
            }
            name
            price
          }
        }
      }
    }
  }
`

const Order = () => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading'
      if (error) return `Error! ${error.message}`

      return (
        <>
        <Heading>Orders</Heading>
        <Table caption='Simple Table'>
          <TableHeader>
            <TableRow>
              <TableCell scope='col' border='bottom'>
                <Text>Total</Text>
              </TableCell>
              <TableCell scope='col' border='bottom'>
                <Text>State</Text>
              </TableCell>
              <TableCell scope='col' border='bottom'>
                <Text>Line Items</Text>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.order.elements.map(({ total, id, state, lineItems }, i) => (
              <TableRow key={id + i}>
                <TableCell scope="row">
                  <Text>
                    ${total}
                  </Text>
                </TableCell>
                <TableCell scope="row">
                  <Text>
                    {state}
                  </Text>
                </TableCell>
                <TableCell scope="row">
                  {lineItems.elements.map(({ orderRef, name, price }) => (
                    <>
                      <Text>{orderRef.id}</Text>
                      <Text>{name}</Text>
                      <Text>{price}</Text>
                    </>
                  ))}
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

export default Order

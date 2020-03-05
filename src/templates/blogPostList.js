import React from 'react'
import Layout from '../components/layout'
import {Link} from 'gatsby'
import styled from 'styled-components'

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
`

const PageNumberWrapper = styled.div`
  border: 1px solid #eee ;
  background: ${props => props.isCurrentPage ? '#eee' : 'white'}
`

const PostWrapper = styled.div`
    border: 1px solid white !important;
    margin: 10px;
    padding: 5px 5px;
    background: white;
`

const PageNumber = styled(Link)`
  display: block;
  padding: 8px 16px;
`

export default ({pageContext}) => (
    <Layout>
        {pageContext.posts.map(post => (
            <PostWrapper key={post.node.wordpress_id}>
                <Link to={`/post/${post.node.slug}`}>
                <h2 dangerouslySetInnerHTML={{__html: post.node.title}} />
                </Link>
                <small>
                    {post.node.date}
                </small>
                <p dangerouslySetInnerHTML={{__html: post.node.excerpt}} />
                <div>
                    <a href={post.node.acf.post_url}>
                        (Seguir leyendo aqui)
                    </a>
                </div>
            </PostWrapper>
        ))}
        
        <Pagination>
        {Array.from({length: pageContext.numberOfPages}).map((page, index) => (
            <PageNumberWrapper key={index} isCurrentPage={index + 1 === pageContext.currentPage}>
                <PageNumber to={index === 0 ? '/blog' : `/blog/${index + 1}`}>
                    {index + 1}
                </PageNumber>
            </PageNumberWrapper>
        ))}
        </Pagination>
    </Layout>
)
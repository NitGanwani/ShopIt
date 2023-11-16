import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Meta from '../components/Meta';
import { useGetProductDetailQuery } from '../slices/productDetailApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
} from '../slices/productsApiSlice';
const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailQuery(productId);

  const [createReview, { isLoading: isReviewLoading }] =
    useCreateReviewMutation();

  const [deleteReview] = useDeleteReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteReviewHandler = async (reviewId) => {
    try {
      if (window.confirm('Are you sure you want to delete this review?')) {
        await deleteReview({ productId: product._id, reviewId }).unwrap();
        refetch();
        toast.success('Review deleted successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: €{product.price}</ListGroup.Item>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>€{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                    {console.log(review._id)} {/* Log review._id */}
                    {userInfo._id === review.user && (
                      <Button
                        variant="danger border-color text-white"
                        className="btn-sm"
                        onClick={() => {
                          deleteReviewHandler(review._id);
                        }}
                      >
                        Delete Review
                      </Button>
                    )}
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a review</h2>
                  {isReviewLoading && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="my-2">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={isReviewLoading}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please <Link to="/login">sign in</Link> to write a review.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;

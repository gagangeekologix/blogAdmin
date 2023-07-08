import { useRef, useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, FormHelperText, Button, Flex, Spinner, CardBody } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { Card, Container } from 'react-bootstrap';

export default function Create() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const editor = useRef(null);
  const [isLoading, setLoading] = useState(false); // Add isLoading state

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('https://blog1-br26.onrender.com/api/users/items', {
        method: 'POST',
        body: JSON.stringify({ title, image, description }),
        headers: {
          'Content-Type': 'application/json'
        }

      });

      if (!res.ok) {
        throw new Error('Failed to create a blog');
      }
      setLoading(false);
      console.log('Blog added successfully');
      // Perform any additional actions after successful creation
      navigate('/'); // Navigate to the desired route on success
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };
  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Container>
      <Card className='p-5 mt-5'>
        <h2 className='text-center fw-bold mb-5'>
          Create Blog
        </h2>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel>Blog Title:</FormLabel>
            <Input
              type="text"
              value={title}
              name="title"
              placeholder='Enter Blog title here'
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Blog Image URL</FormLabel>
            <Input
              type="text"
              placeholder="Enter Blog Image URL..."
              name="Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Blog Content:</FormLabel>
            <JoditEditor
              ref={editor}
              value={description}
              onChange={(e) => setDescription(e)}
            />
          </FormControl>

          <Button type="submit" className="bg-success text-white mt-3">
            Create Blog
          </Button>
        </form>
      </Card>
    </Container>
  );

}





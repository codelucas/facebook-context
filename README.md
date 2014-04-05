text2img
========

Facebook SoCal regional hackathon -- Generates an image from text by fetching 
keywords and descriptors from the text and querying that data on 
google images for relevant images to a facebook status.

We return the top four image and the user may scroll through those
to pick an image of choice to use on his/her status.


Technology:
-----------
- Chrome extension for our client side
- Flask powering our python based application server
- Nginx as the HTTP server
- Supervisord to keep things alive
- AlchemyAPI & NLTK for NLP processing
- Google Images API for image querying


By: [Lucas](http://lucasou.com), [Olivier](http://oliviertruong.com/), 
[Kevin](https://www.facebook.com/kevinjonaitis117) from UCI for the 
Facebook regional hackathon.

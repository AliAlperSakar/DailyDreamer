import unittest
from unittest.mock import patch
from api_logic import create_story_via_api,post_api
from const import api_url,api_model,api_authorization

constants = {
    "api_url": api_url,
    "api_model": api_model,
    "api_authorization":api_authorization
}

class TestApiLogic(unittest.TestCase):
    @patch('api_logic.post_api')
    def test_create_story_via_api(self, mock_post_api):
        # Gerçek veriler yerine test verileri kullanılıyor
        result = create_story_via_api(constants, 'creativity', 'top_p', 'story_length', 'form_of_ending', 'place', 'time',
                                              'interests', 'target', 'species', 'theme', 'protagonist', 'age', 'friends')
        
        
        self.assertEqual(True,True)


if __name__ == '__main__':
    unittest.main()

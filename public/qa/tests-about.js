suite('"About" Page Tests', function(){
  test('page should contain link to concat page', function(){
    assert( $('a[href="/concat"]').length );
  });
});

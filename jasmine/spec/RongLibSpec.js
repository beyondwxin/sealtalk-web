describe("sealtalk config", function() {
	var config = window.__sealtalk_config;

    it("serverUrl == http://api.hitalk.im", function() {
        expect(config.serverUrl).toEqual("http://api.hitalk.im");
    });
    it("appkey == e0x9wycfx7flq", function() {
        expect(config.appkey).toEqual("e0x9wycfx7flq");
    });    
});



describe("异步请求处理demo",function(){
	var data;

	beforeEach(function(done) {
		setTimeout(function() { //setTimeout表示异步
			$.ajax({
				type: "get",
				url: './src/data.js',
				success: function(response) {
					data = eval("("+ response +")");
					console.log("request back");
				},
			});

		    done();		// 调用done表示回调成功，否则超时。
		}, 0);
			
	});

	it("data.a", function(done) {
      setTimeout(function() {

		expect(data.a).toEqual("1");

        done();
      }, 0);
    });

    it("data.a,b", function(done) {
      setTimeout(function() {

		expect(data.b).toBeLessThan(2);
		expect(data.c).toBe(true);

        done();		// 调用done表示回调成功，否则超时。
      }, 0);
    });
});

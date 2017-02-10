# tweetSearch
simple (?) demo app for Twitter Search using node/js/express.

Routes
-----------

/ (single UI page)

/counts

/data

demo: request 100 Tweets
dev: --> mongo db with 'tweets' collection, 'actor' collection


/dashboard

stats: # of Tweets, request period?

/options

saveData
dropData
loadData

------------------------------------

TODO:

[] using mongo with a single overwritten collection...

[] Add in Search data requests...
[] Managing multiple requests...
    [] progress updates ("making 4th request")
[] Add in UI details
  [] Datetime pickers
  [] radio buttons (count bins)
  [] Checkboxes, retrieve data (or just counts)



  [] Chart to-dos
    []X-axis labels






Deploy notes:

[] in app folder, run ```npm install```
[] in app folder, run ```express```

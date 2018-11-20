#!C:\Users\Jason Horsley\AppData\Local\Programs\Python\Python37\python
#!your python exec path here
#!server python exec path here too


# get map name from http post variables...
# https://stackoverflow.com/questions/3582398/getting-http-get-arguments-in-python maybe?
# Make offline export

print("Content-Type: text/html\n")
print ("done")

# Maybe a 5 second wait, then refresh to the download link area?
# Maybe generate some nice HTML to show the download?
# Maybe auto download, then refresh back to ../select_map.php or something
# Or maybe we change this from a http post to a ajax get variable for the map name, and we autodownload after the callback from select_map.js line 175 ish
/*
{id: "export_zip", view: "button", label: "Exprt Offline ZIP",
    disabled: true, on: {
        onItemClick: function () {
            ajax_general(...)
        }
    }
},
*/
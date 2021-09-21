# process image

import argparse, subprocess, sys, os, re, json
import mechanicalsoup

parser = argparse.ArgumentParser(description='Clicky Stats Daemon')
parser.add_argument('-v', '--verbose', default=False, action='store_true', help='Verbose')
parser.add_argument('-t', '--test_run', default=False, action='store_true', help='Test Run')
args = parser.parse_args()


def docommand(cmd):
    print(cmd)
    if not args.test_run:
        subprocess.call(cmd, shell=True)

browser = mechanicalsoup.StatefulBrowser()
browser.open('https://droughtmonitor.unl.edu/')
soup = browser.get_current_page()
input_fname = ''
output_fname = ''
release_date_str = ''
# get display date, and get image...
for h2 in soup.find_all('h2'):
    m = re.search(r'Map released: (\w+ \d+, 20\d\d)',h2.text)
    if m:
        release_date_str = m.groups()[0]
        print("Release date",release_date_str)
        # <a href='/data/png/20210706/20210706_usdm.png' style='display: inline-block;' target='_blank' title='Current map (page 1) PNG'>
        for anchor in soup.select('a[title*=Current]'):
            # print("Anchor href",anchor['href'])
            if '_usdm.png' in anchor['href']:
                print("PNG",anchor['href'])
                ofile = "src/assets/img/usdm-assets/" + anchor['href'][19:]
                if os.path.exists(ofile):
                    print("Already have file")
                else:
                    cmd = 'curl https://droughtmonitor.unl.edu%s >%s' % (anchor['href'], ofile)
                    docommand(cmd)
                    input_fname = ofile
                    output_fname = input_fname.replace(".png","_excerpt.png")
                break
        break


if input_fname != "":
    temp_file_in = input_fname.replace(".png","_mapTemp_1.png")
    temp_file1 = input_fname.replace(".png","_mapTemp_1.png")
    temp_file2 = input_fname.replace(".png","_mapTemp_2.png")

    cmd = 'composite %s src/py/generate-drought-map/usdm_mask.png -compose Lighten %s' % (input_fname, temp_file1)
    docommand(cmd)

    cmd = 'convert %s -crop 2848x1824+0+194 -resize 620 %s' % (temp_file1, temp_file2)
    docommand(cmd)

    cmd = 'pngcrush %s %s' % (temp_file2, output_fname)
    docommand(cmd)

    cmd = 'rm %s %s' % (temp_file1, temp_file2)
    docommand(cmd)

    data = { "dateString" : release_date_str, "filePath": output_fname.replace("src", "") }
    with open('src/templates/_data/latestDroughtMap.json', 'w') as outJson:
        json.dump(data, outJson)

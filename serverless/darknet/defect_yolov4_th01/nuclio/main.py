import json
import base64
import io
import yaml
from darknet_images import detector


def init_context(context):
    context.logger.info("Init context...  0%")
    setattr(context.user_data, 'detector', detector)
    functionconfig = yaml.safe_load(open("/opt/nuclio/function.yaml", encoding='utf-8'))
    labels_spec = functionconfig['metadata']['annotations']['spec']
    labels = {item['id']: item['name'] for item in json.loads(labels_spec)}
    setattr(context.user_data, "labels", labels)
    context.logger.info("Init context...100%")

def handler(context, event):
    context.logger.info("Run YOLOv4 하수관로")
    data = event.body
    image_path = io.BytesIO(base64.b64decode(data["image"].encode('utf-8')))

    results = context.user_data.detector(image_path, 0.005)
    return context.Response(body=json.dumps(results, ensure_ascii=False), headers={},
        content_type='application/json', status_code=200)

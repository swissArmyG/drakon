import cervical from '../img/vertebrae/cervical.gif';
import thoracic from '../img/vertebrae/thoracic.gif';
import lumbar from '../img/vertebrae/lumbar.gif';
import sacral from '../img/vertebrae/sacral.gif';

const topics = {
  'CERVICAL': {
    header: 'Cervical C1-C7',
    basicSpineAnatomy: 'The cervical spine consists of seven vertebrae (C1-C7) located in the neck, allowing for a wide range of motion. The first two vertebrae, the atlas (C1) and axis (C2), are unique in structure, enabling head rotation and support.',
    pathology: 'Common issues include degenerative disc disease, cervical spondylosis, and herniated discs. These conditions can lead to nerve compression and cause pain and neurological symptoms.',
    clinicalConditions: 'Conditions such as whiplash, cervical radiculopathy, and spinal stenosis frequently affect this region. Injuries and chronic conditions can lead to symptoms like neck pain, stiffness, and numbness or tingling in the arms.',
    physicalExamItems: 'Key exam elements include assessing neck mobility, reflexes, muscle strength, and sensory function. Special tests, such as Spurling\'s test, can help diagnose cervical radiculopathy.',
    treatmentOptions: 'Treatments range from physical therapy and medications to epidural injections and, in severe cases, surgery. Non-surgical treatments aim to reduce pain and improve function, while surgical options may be necessary for severe nerve compression or instability.',
    funFact: 'The cervical spine, particularly the atlas (C1) and axis (C2) vertebrae, allow for approximately 50% of the total rotation of the entire spine, enabling us to turn our heads to look around.',
    imageURL: cervical
  },
  'THORACIC': {
    header: 'Thoracic T1-T12',
    basicSpineAnatomy: 'The thoracic spine consists of twelve vertebrae (T1-T12) located in the upper and mid-back, providing stability and protecting the chest organs. These vertebrae are attached to the rib cage, limiting motion but adding structural integrity.',
    pathology: 'Common issues include kyphosis, scoliosis, and thoracic disc herniation. Degenerative changes and fractures can also affect this region, especially in older adults.',
    clinicalConditions: 'Conditions such as thoracic outlet syndrome, osteoporosis-related fractures, and Scheuermann\'s disease often occur in this area. These conditions can cause mid-back pain, postural changes, and neurological symptoms.',
    physicalExamItems: 'Examination focuses on posture assessment, rib cage mobility, and thoracic spine palpation for tenderness. Specific tests, like the Adam\'s forward bend test, can help identify scoliosis.',
    treatmentOptions: 'Treatments include bracing, physical therapy, pain management, and in some cases, surgical intervention. Addressing the underlying cause is crucial for effective management and improving the patient\'s quality of life.',
    funFact: 'The thoracic spine is the only region of the spine that is attached to the rib cage, providing stability and protection to the vital organs housed in the chest cavity.',
    imageURL: thoracic
  },
  'LUMBAR': {
    header: 'Lumbar L1-L5',
    basicSpineAnatomy: 'The lumbar spine consists of five vertebrae (L1-L5) located in the lower back, known for their strength and weight-bearing capacity. These vertebrae are larger and more robust, supporting much of the body\'s weight and providing flexibility.',
    pathology: 'Common issues include lumbar disc herniation, degenerative disc disease, and spinal stenosis. These conditions can cause significant pain and limit mobility, often affecting daily activities.',
    clinicalConditions: 'Conditions such as sciatica, lumbar radiculopathy, and lower back pain frequently affect this region. These conditions can result in pain radiating down the legs, muscle weakness, and difficulty in movement.',
    physicalExamItems: 'Exam elements include lumbar spine flexibility, muscle strength, reflexes, and gait analysis. Tests like the straight leg raise test can help diagnose lumbar radiculopathy.',
    treatmentOptions: 'Treatments range from physical therapy, chiropractic care, and medications to lumbar injections and surgery for severe cases. A comprehensive approach often includes exercise, pain management, and lifestyle modifications.',
    funFact: 'The lumbar spine (L1-L5) is designed to bear a significant amount of weight and stress. Each lumbar vertebra is larger and more robust compared to cervical and thoracic vertebrae, reflecting its role in supporting the body\'s weight.',
    imageURL: lumbar
  },
  'SACRAL': {
    header: 'Sacral S1-S5',
    basicSpineAnatomy: 'The sacral spine consists of five fused vertebrae (S1-S5) forming the sacrum, which connects the spine to the pelvis. The sacrum plays a critical role in transferring weight from the upper body to the lower extremities and provides structural support.',
    pathology: 'Common issues include sacroiliac joint dysfunction, sacralization, and fractures. Conditions affecting the sacrum can cause pain and impact mobility and stability.',
    clinicalConditions: 'Conditions such as sacroiliitis, coccydynia, and sacral nerve compression occur in this region. These conditions can result in lower back pain, buttock pain, and symptoms affecting the lower limbs.',
    physicalExamItems: 'Examination includes pelvic alignment assessment, sacroiliac joint tests, and evaluating for tenderness and stability. Tests like the FABER (Patrick\'s) test can help diagnose sacroiliac joint dysfunction.',
    treatmentOptions: 'Treatments involve physical therapy, manual manipulation, injections, and in some cases, surgical procedures. A multi-disciplinary approach often yields the best results, addressing pain, function, and overall quality of life.',
    funFact: 'The sacrum (S1-S5) is a triangular bone formed by the fusion of five sacral vertebrae. It articulates with the hip bones (ilia) to form the pelvis, providing stability and transferring weight between the spine and the lower extremities.',
    imageURL: sacral
  }
}

export default topics;